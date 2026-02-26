import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Submission {
    name: string;
    bookRequirement: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<Submission>>;
    submitForm(name: string, phone: string, bookRequirement: string): Promise<void>;
}
