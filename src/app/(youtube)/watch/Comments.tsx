import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { FC, useMemo, useState } from "react";
import {
	FiHeart as HeartIcon,
	FiThumbsUp as LikeIcon,
	FiLock as PinnedIcon,
	FiCornerDownRight as ShowRepliesIcon,
	FiSlash as SlashIcon,
	FiCheck as UploaderIcon
} from "react-icons/fi";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { CircularProgress } from "@heroui/progress";
import { Tooltip } from "@heroui/tooltip";

import { useClient } from "@/hooks/useClient";

import { Author } from "@/client/typings/author";
import {
	Comment as CommentProps,
	Comments as CommentsProps
} from "@/client/typings/comment";
import formatBigNumber from "@/utils/formatBigNumber";
import formatUploadedTime from "@/utils/formatUploadedTime";
import { highlight } from "@/utils/highlight";
import { channelUrl } from "@/utils/urls";

import { HighlightRenderer } from "./HighlightRenderer";

const Comment: FC<{
	data: CommentProps;
	videoUploader: Author;
	videoId: string;
}> = ({ data, videoUploader, videoId }) => {
	const message = useMemo(() => highlight(data.message), [data.message]);

	const client = useClient();

	const [showReplies, setShowReplies] = useState(false);

	const {
		data: replies,
		error: repliesError,
		refetch: refetchReplies,
		isLoading: isLoadingReplies
	} = useQuery({
		queryKey: ["replies", videoId, data.repliesToken],
		queryFn: () => client.getComments(videoId, data.repliesToken),
		enabled: showReplies && !!data.repliesToken
	});

	const userUrl = data.author.id ? channelUrl(data.author.id) : "#";

	return (
		<div className="flex flex-row gap-4">
			<div>
				<Link as={NextLink} href={userUrl}>
					<Avatar
						isBordered
						name={data.author.name}
						showFallback
						size="lg"
						src={data.author.avatar}
					/>
				</Link>
			</div>

			<div className="flex flex-col gap-2 w-full">
				<div className="flex flex-row gap-2">
					<Link as={NextLink} href={userUrl}>
						<p className="font-semibold text-default-foreground">
							{data.author.name}
						</p>
					</Link>
					{data.author.id === videoUploader.id && (
						<Chip
							className="pl-2"
							color="primary"
							startContent={<UploaderIcon />}
						>
							Uploader
						</Chip>
					)}
					{data.pinned && (
						<Chip
							className="pl-2"
							color="primary"
							startContent={<PinnedIcon />}
						>
							Pinned
						</Chip>
					)}
				</div>

				<p>
					<HighlightRenderer highlighted={message} />
				</p>

				<div className="flex flex-row gap-4 items-center">
					<div className="flex flex-row tracking-tight text-default-500 items-center gap-1">
						<LikeIcon />
						<p>{formatBigNumber(data.likes)} likes</p>
					</div>

					<div className="tracking-tight text-default-500">
						<p>{formatUploadedTime(data.written)}</p>
					</div>

					{data.videoUploaderLiked && (
						<div className="flex items-center">
							<Tooltip content="Uploader liked" showArrow>
								<p className="text-danger text-xl">
									<HeartIcon />
								</p>
							</Tooltip>
						</div>
					)}

					{data.videoUploaderReplied && (
						<div>
							<Avatar
								name={videoUploader.name}
								showFallback
								size="sm"
								src={videoUploader.avatar}
							/>
						</div>
					)}

					{data.edited && (
						<p className="tracking-tight text-default-500">(edited)</p>
					)}

					{data.repliesToken && (
						<Button
							onClick={() => setShowReplies((state) => !state)}
							startContent={<ShowRepliesIcon />}
							variant="light"
						>
							{showReplies ? "Hide replies" : "Show replies"}
						</Button>
					)}
				</div>

				{showReplies && (
					<div className="flex flex-col gap-4">
						<Comments
							data={replies}
							error={repliesError}
							isLoading={isLoadingReplies}
							refetch={refetchReplies}
							videoId={videoId}
							videoUploader={videoUploader}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export const Comments: FC<{
	data?: CommentsProps;
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
	videoUploader: Author;
	videoId: string;
}> = ({ data, isLoading, error, refetch, videoUploader, videoId }) => (
	<>
		{data && (
			<>
				<p className="text-xl">
					{data.count && formatBigNumber(data.count)} Comments
				</p>

				<Divider orientation="horizontal" />

				<div className="flex flex-col gap-4">
					{data.enabled && (
						<>
							{data.data.map((comment) => (
								<Comment
									data={comment}
									key={comment.id}
									videoId={videoId}
									videoUploader={videoUploader}
								/>
							))}
						</>
					)}
					{!data.enabled && (
						<div className="flex flex-row gap-2 items-center">
							<SlashIcon />
							<p>Comments on this video are disabled</p>
						</div>
					)}
				</div>
			</>
		)}
		{!data && isLoading && (
			<div className="h-24 w-full justify-center items-center flex">
				<CircularProgress aria-label="Loading comments..." />
			</div>
		)}
		{error && (
			<div className="flex flex-col gap-2">
				<p className="text-lg font-semibold">Failed to load comments:</p>
				{error.toString()}
				<div>
					<Button color="primary" onClick={() => refetch()}>
						Retry
					</Button>
				</div>
			</div>
		)}
	</>
);
