import { Schema, model } from 'mongoose';

export interface IStudent {
    name: string;
    roll_no: string;
    course: string;
    year: number;
}

