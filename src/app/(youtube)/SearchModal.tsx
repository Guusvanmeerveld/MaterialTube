"use client";

import { Button } from "@nextui-org/react";
import { FC, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from "@nextui-org/modal";

import { Search } from "@/components/Search";

export const SearchModal: FC = () => {
	const [isOpen, setOpen] = useState(false);

	useHotkeys(
		"ctrl+k",
		() => {
			setOpen(true);
		},
		{ preventDefault: true }
	);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
			}}
			size="2xl"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">Search</ModalHeader>
						<ModalBody>
							<Search onSearch={() => onClose()} />
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Close
							</Button>
							<Button color="primary">Search</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
