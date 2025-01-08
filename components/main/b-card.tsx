import {PropsWithChildren} from "react";

export default function BCard({ children }: PropsWithChildren) {
    return (
        <section>
            <div>
            <div className="flex flex-col w-full">
                {children}
            </div>
            </div>
        </section>
    )
}
