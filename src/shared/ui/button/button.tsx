import { Button as RadixButton } from '@radix-ui/themes';
import {ComponentProps} from "react";

export function Button (props : ComponentProps<typeof RadixButton>) {
    return <RadixButton {...props}/>
}