'use client'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import React from 'react'
import {Button} from '@/components/ui/button'
import {useAppStore} from '@/store/app'
import {Menu} from 'lucide-react'
import Link from "next/link";

export default function HeaderItems() {
  let [open, setOpen] = React.useState(false)
  const {headerLinks, setDrawerStatus} = useAppStore((state) => state)
  const changeHappen = function (data: boolean) {
    setDrawerStatus(data)
    setOpen(data)
  }
  const turnDrawerOff = function () {
    changeHappen(false)
  }
  return (
    <>
      <Drawer open={open} onOpenChange={changeHappen}>
        <DrawerTrigger>
          <Menu />
        </DrawerTrigger>
        <DrawerContent className={'h-[40%]'}>
          <div className="overflow-auto p-6">
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              {/*vfor 20 times*/}
              <div className="flex flex-col space-y-3">
                {headerLinks.map((link, index) => (
                  <Link onClick={turnDrawerOff} key={index} className="text-base" href={link.url}>
                    {link.title}
                  </Link>
                ))}
              </div>


              <DrawerDescription>

              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter></DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
