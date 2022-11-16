import {MeiliSearch} from "meilisearch";
import {getConfigs} from "../utils/configs.js";

const meiliSearchClient = new MeiliSearch(getConfigs().meilisearch);

export function getClient() {
    return meiliSearchClient;
}
