import React from "react";
import { Type } from "../utils/models";
interface IInputProps {
    type?: Type;
    isRange?: boolean;
    value?: any;
    onChange?: (o: any) => void;
}
export declare const RsbFilterInput: React.FC<IInputProps>;
export {};
