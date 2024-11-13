import { MessageSquare, UsersRound, CircleUserRound, BellRing, LockKeyhole, LogOut } from 'lucide-react';

export const sidebarData = [
    {
        icon: MessageSquare,
        name: "Messages",
        route: "/talkitout/messages"
    },
    {
        icon: UsersRound,
        name: "Groups",
        route: "/talkitout/groups"
    }
]

export const userSidebarData = [
    {
        icon: CircleUserRound,
        name: "Account"
    },
    {
        icon: BellRing,
        name: "Notifications"
    },
    {
        icon: LockKeyhole,
        name: "Privacy"
    },
    {
        icon: LogOut,
        name: "Logout"
    }
]