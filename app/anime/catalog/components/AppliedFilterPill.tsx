// import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type FilterPillProps = {
    onDelete: () => void
    className: string
    label: string
}

export default function AppliedFilterPill({className, label} : FilterPillProps) {
    return (
        <div className={cn("px-4 py-2 flex gap-3 rounded-full whitespace-nowrap text-xs md:text-sm lg:text-base items-center", className)}>
            <p>{label}</p>
            {/* <X className="size-4" onClick={onDelete}/> */}
        </div>
    )
}