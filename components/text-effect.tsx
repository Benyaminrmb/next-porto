import {TextHoverEffect} from '@/components/ui/text-hover-effect'
export default function TextEffect({ text }:{text:string}) {
  return (
    <div className="h-[40rem] flex items-center justify-center">
      <TextHoverEffect text={text} />
    </div>
  )
}
