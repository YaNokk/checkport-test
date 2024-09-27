import { TextField } from "@radix-ui/themes";
import {ComponentProps} from "react";

export function Input (props : ComponentProps<typeof TextField.Root>) {
    return <TextField.Root {...props}/>
}