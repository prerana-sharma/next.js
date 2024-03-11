import { createStyles, Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

// Define the prop types
interface BackProps {
  href: string;
  style?: React.CSSProperties;
  className?: string;
}

const useStyles = createStyles((theme) => ({
  back: {
    marginBottom: "10px",
    display: "inline-block",
  },
}));

const Back: React.FC<BackProps> = ({ href, style, className }) => {
  const { classes } = useStyles();
  return (
    <Box style={style && style} className={className}>
      <Link href={href} className={`btn-back ${classes.back}`}>
        <Image src="./arrow-back.svg" alt="back arrow" width={24} height={24} />
        Back
      </Link>
    </Box>
  );
};

export default Back;
