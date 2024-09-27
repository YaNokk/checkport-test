import {Text} from "@radix-ui/themes";
import style from './notFound.module.scss';

export function NotFound () {
    return <Text size={'7'} className={style.notFound}>404 страница не найдена</Text>
}