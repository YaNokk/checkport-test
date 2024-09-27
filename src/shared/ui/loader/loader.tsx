import {Spinner} from "@radix-ui/themes";
import style from './loader.module.scss';

export function Loader () {
    return <div className={style.cover}><Spinner className={style.spinner}/></div>
}