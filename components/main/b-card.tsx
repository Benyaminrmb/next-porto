import {PropsWithChildren} from "react";

export default function BCard({ children }: PropsWithChildren) {
    return (
        <section>
            <div>
                {children}
            </div>
        </section>
    )
}
