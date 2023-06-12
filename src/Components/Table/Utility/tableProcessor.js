import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";

const protectUnColoredCells = (spreadSheet, sheet, color) => {
    const cellsWithColor = getAllCellsWithColor(sheet, color);
    // let protectSetting = {
    //     selectCells: true,
    //     formatCells: false,
    //     formatRows: false,
    //     formatColumns: false,
    //     insertLink: false,
    // };
    //spreadSheet.protectSheet(0, protectSetting)
};

const getAllCellsWithColor = (sheet, color) => {
    const rows = sheet["rows"];
    if (!rows) {
        return;
    }
    let answerSet = [];
    for (const rowKey in rows) {
        if (!rows[rowKey] || !rows[rowKey]["cells"]) {
            continue;
        }
        const row = rows[rowKey];

        let cells = row["cells"];

        for (const cellKey in cells) {
            if (
                !cellKey ||
                !cells[cellKey] ||
                !cells[cellKey]["style"]["backgroundColor"]
            ) {
                continue;
            }
            if (cells[cellKey]["style"]["backgroundColor"] !== color) {
                continue;
            }
            const rowNumber = Number(rowKey);
            const columnKey = Number(cellKey);
            const cellPosition = [rowKey, columnKey];
            answerSet.push(cellPosition);
        }
    }
    return answerSet;
};

export { protectUnColoredCells, getAllCellsWithColor };
