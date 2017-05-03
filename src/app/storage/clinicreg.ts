import DB from './ngdb';

declare const window;

export const NgDB = new DB('clinicreg');

export const AdminsDB = NgDB.setCollection('admins', { primaryKey: "id" });
export const PatientsDB = NgDB.setCollection('patients', { primaryKey: "id" });
export const PaymentsDB = NgDB.setCollection('payments', { primaryKey: "id" });
export const SessionsDB = NgDB.setCollection('sessions', { primaryKey: "id" });
export const BackupDB = NgDB.setCollection('backup', { primaryKey: "id" });
export const DiaryDB = NgDB.setCollection('diary', { primaryKey: "id" });
export const MessagesDB = NgDB.setCollection('messages', { primaryKey: "id" });
export const StoreDB = NgDB.setCollection('store', { primaryKey: "id" });
export const StoreActionDB = NgDB.setCollection('storeAction', { primaryKey: "id" });

NgDB.loadPersistedData();

window.DB = NgDB.getDb();
