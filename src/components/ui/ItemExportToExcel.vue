<template>
    <button class="btn btn-success" @click="exportToExcel">
        <i class="fa fa-file-excel"></i> Export
    </button>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
    props: {
        tableData: { type: Array, required: true },
        headers: { type: Array, required: true },
        fileName: { type: String, default: 'export.xlsx' },
    },
    methods: {
        exportToExcel() {
            if (!this.tableData.length) {
                alert("Ma'lumotlar mavjud emas!");
                return;
            }
            const data = this.tableData.map((row, index) => {
                let formattedRow = { '#': index + 1 };
                this.headers.forEach((header) => {
                    formattedRow[header.label] = row[header.key];
                });
                return formattedRow;
            });

            const worksheet = XLSX.utils.json_to_sheet(data, { origin: 'A2' });

            XLSX.utils.sheet_add_aoa(worksheet, [["Filial Ma'lumotlari"]], {
                origin: 'A1',
            });
            worksheet['!merges'] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: this.headers.length } },
            ];

            worksheet['!cols'] = this.headers.map(() => ({ wch: 20 }));

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Filiallar');

            const excelBuffer = XLSX.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            const blob = new Blob([excelBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            saveAs(blob, this.fileName);
        },
    },
};
</script>

<style scoped>
.btn-success {
    background-color: #28a745;
    color: white;
}
.btn-success:hover {
    background-color: #218838;
}
</style>
