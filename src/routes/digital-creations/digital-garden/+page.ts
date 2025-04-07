import { csvStringToJson, fetchGoogleSheet } from "$lib/data/digital-garden";

export const load = async () => {
    const sheetId = '157-hKxR5BwVdJ_aT3dQs4wQtGA9d50CnNTrpigENczs';

    try {
        const data= await fetchGoogleSheet(sheetId);
        return {
            sheetData: data ? csvStringToJson(data) : [],
        };
    } catch (error) {
        console.error("Failed to load sheet data:", error);
        return {
            sheetData: [],
        };
    }
};

export interface SheetData {
	itemPosition: string;
	title: string;
	image: string;
	link: string;
	text: string;
	icon: string;
	label: string;
}