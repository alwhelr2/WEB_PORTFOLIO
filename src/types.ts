enum TriggerType {
    Normal = 'Normal',
    Strict = 'Strict',
    Exact = 'Exact',
    StartsWith = 'StartsWith',
    EndsWith = 'EndsWith'
}

enum ButtonRoleType {
    Add = 'Add',
    Remove = 'Remove'
}

export enum BackTo {
    GUILDS,
    USERS,
    HOME
}

export type ITrigger = {
    text: string;
    response: string;
    type: TriggerType;
    chance: number;
    id: string;
    enabled: boolean;
    triggerbyuser?: string;
    guildid?: string | null;
    channelid?: string | null;
}

export type IUser = {
    id: string;
    username: string;
    avatar: string;
    bot: boolean;
    createdTimestamp: number;
    banner?: string;
    mybot: boolean;
    status?: string;
    birthdaymonth?: string;
    birthdaydate?: number;
    user_guilds: IGuild[];
    triggers: ITrigger[];
}

export type IGuild = {
    id: string;
    name: string;
    themecolor: number;
    commandalias: string;
    joinleavelogchannel?: string;
    messagelogchannel?: string;
    iconURL?: string;
    owner: string;
    joinrole?: string;
    birthdaychannel?: string;
    starboardchannel?: string;
    starboardlimit: number;
    starboardenabled: boolean;
    starboardselfstar: boolean;
    guild_users: IUser[];
    triggers: ITrigger[];
    reactionroles: IReactionRole[];
}

export type IReactionRole = {
    emojiid: string;
    roleid: string;
    messageid: string;
    guildid: string;
    uniquereact: boolean;
}

export type IButtonRole = {
    customid: string;
    roleid: string;
    messageid: string;
    guildid: string;
    type: ButtonRoleType;
}

export type IGuildUser = {
    guildid: string;
    userid: string;
}

export type IChannel = {
    id: string;
    name: string;
    type: number;
}

export type IRole = {
    id: string;
    name: string;
}