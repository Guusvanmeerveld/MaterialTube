import { FC, PropsWithChildren } from "react";

export type Component<P = unknown> = FC<PropsWithChildren<P>>;
