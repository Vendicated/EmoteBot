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

import { Column, Entity, PrimaryColumn } from "typeorm";
import { ImageFormat } from "../../util/types";

@Entity()
export class UserSettings {
	@PrimaryColumn("bigint")
	public id: string;

	@Column("varchar", {
		length: 20,
		array: true
	})
	public prefixes: string[];

	@Column("enum", { enum: ["png", "jpeg", "webp"], default: "webp" })
	public imageFormat: ImageFormat;

	@Column("bool", { default: false })
	public overrideExisting: boolean;
}
