import styles from "./Title.module.sass";

import { FC } from "react";

const Title: FC = () => {
	return <h1 className={styles.title}>Hello World</h1>;
};

export default Title;
