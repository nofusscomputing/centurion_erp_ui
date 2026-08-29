import {
    layoutCard
} from "./card";
import { layoutDataset } from "./dataset";
import { layoutDetail } from "./detail";
import { layoutTable } from "./table";
import { layoutTicket } from "./ticket";


/**
 * 
 * @category Type
 * @since 0.10.0
 */


/**
 * Describes how the object is to be laid out within the UI. Although ALL keys
 * are listed as optional, unless the object does not ever be displayed in the
 * UI, this object should have at minimum, the view the object is to be
 * rendered as.
 * 
 * 
 * @summary How to layout the object
 * 
 * @category Description
 * @expandType layoutCard
 * @expandType layoutDataset
 * @expandType layoutDetail
 * @expandType layoutTable
 * @expandType layoutTicket
 * @since 0.10.0
 */
export type UILayout =
    layoutCard
    | layoutDataset
    | layoutDetail
    | layoutTable
    | layoutTicket
