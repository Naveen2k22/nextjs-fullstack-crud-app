import Link from "next/link";
import { Button } from "react-bootstrap";

export default function ButtonLink (props) {
   return(
    <Link href={props.link} >
      <Button variant={props.variant} type={props.type}>{props.children}</Button>
    </Link>
   )
}