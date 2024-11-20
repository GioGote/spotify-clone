"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

// Oh boy here we go
interface SidebarProps {
    children: React.ReactNode;
}

// React.FC is a type that ships with React's TypeScript types
// It represents the type of functional component, which is the
// building block of most modern React apps.
// THIS IS WHATS ACTUALLY BEING IMPORTED/SENT TO OTHER PARTS OF APP
const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {
    // Hook
    const pathname = usePathname();

    // array of possible routes accessible from the Sidebar
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        }
    ], [pathname]);

    return (
        <div className="flex h-full">
            <div
                className="
                    hidden
                    md:flex
                    flex-col
                    gap-y-2
                    bg-black
                    h-full
                    w-[300px]
                    p-2
                "
            >
                <Box>
                    {/*Time to display routes*/}
                    <div
                        className="
                            flex
                            flex-col
                            gap-y-4
                            px-5
                            py-4
                        "
                    >
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    {/*Add the Library Component*/}
                    <Library />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;