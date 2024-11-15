"use client";

import Link from "next/link";
import Button from "../../Shared/Button/Button";
import Typography, { TextColors, TextFontWeights } from "../../Shared/Typography/Typography";

const DesktopHeader = () => {
    return (
        <div>
            <Link href="hizmetler">Hizmetler</Link>
            <Link href="blog">Blog</Link>
            <Link href="hakkimda">Hakkımda</Link>
            <Button title="Randevu Al" ariaLabel="Randevu Al" handleClick={() => null} />
            <Typography text="erhan" color={TextColors.black} fontWeight={TextFontWeights.bold} />
        </div>
    );
};

export default DesktopHeader;
