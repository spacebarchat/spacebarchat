# Permission

To get the permission for a guild member import the `getPermission` from `fosscord-server-util`.

```typescript
import { getPermission } from "fosscord-server-util"
```

The first argument is the userid the second the guildid and the third channelid if you want to receive the permission for a certain channel.

```typescript
getPermission(user_id: string, guild_id: string, channel_id?: string): Promise<Permissions>;
```

## Example

```typescript
const perms = await getPermission(req.userid, guild_id);
perms.hasThrow("MANAGE_GUILD") // will throw an error if the users lacks the permission

if (perms.has("MANAGE_GUILD")) {
    ...
}
```

