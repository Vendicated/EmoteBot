/** This file is part of Emotely, a Discord Bot providing all sorts of emote related commands.
 * Copyright (C) 2021 Vendicated
 *
 * Emotely is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Emotely is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Emotely.  If not, see <https://www.gnu.org/licenses/>.
 */

import { PACKAGE_JSON } from "@util/constants";
import { msToHumanReadable } from "@util/stringHelpers";
import { stripIndents } from "common-tags";
import { PermissionString, User, version } from "discord.js";
import { InlineEmbed } from "../../Embed";
import { ICommandArgs } from "../CommandArguments";
import { CommandContext } from "../CommandContext";
import { IBaseCommand } from "../ICommand";

export default class Command implements IBaseCommand {
	public description = "Find out more about me";
	public aliases = [];
	public ownerOnly = false;
	public guildOnly = false;
	public userPermissions: PermissionString[] = [];
	public clientPermissions: PermissionString[] = [];
	public args: ICommandArgs = {};

	public async callback(ctx: CommandContext) {
		const { client } = ctx;
		const app = await client.fetchApplication();
		const owner = client.owners.size === 1 ? client.owners.first() : app.owner instanceof User ? app.owner : app.owner?.owner.user;

		const url = PACKAGE_JSON.repository.url.replace(".git", "").replace("git+", "");
		const embed = new InlineEmbed("INFO")
			.setTitle(client.user.tag)
			.setURL(url)
			.setThumbnail(client.user.displayAvatarURL())
			.setDescription(
				stripIndents`
                Hello! I am ${client.user.username}, an open source bot centered all around emotes!

                If you have any feedback or questions or would just like to chat, feel free to send my owner a friend request!
            `
			)
			.addField("Owner", owner?.tag)
			.addField("Client ID", client.user.id)
			.addField("Uptime", msToHumanReadable(process.uptime() * 1000, true))
			.addField("Server Count", client.guilds.cache.size)
			.addField("Channel Count", client.channels.cache.size)
			.addField(
				"Estimated User Count",
				client.guilds.cache.reduce((acc, curr) => acc + curr.memberCount, 0)
			)
			.addField("Language", `NodeJS ${process.version}`)
			.addField("Library", `discord.js v${version}`)
			.addField("License", PACKAGE_JSON.license)
			.addField("Source Code", url, false);

		await ctx.reply(undefined, embed);
	}
}
