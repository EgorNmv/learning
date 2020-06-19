import React from "react";

export const formatDate = (date: Date): string => {
    const dd: string = date.getDate() < 10
        ? "0" + date.getDate().toString()
        : date.getDate().toString();
    const mm: string = (date.getMonth() + 1) < 10
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString();
    const yy: string = (date.getFullYear() % 100) < 10
        ? "0" + (date.getFullYear() % 100).toString()
        : (date.getFullYear() % 100).toString();

    return `${dd}.${mm}.${yy}`;
}

export function useFileUpload<T>(
): [boolean, (
    file: File,
    type: "user" | "training" | "category",
    id?: string
) => Promise<T>] {
    const typeMap: { [key: string]: string } = {
        "user": "0",
        "training": "1",
        "category": "2"
    };
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const sendFile = async (
        file: File,
        type: "user" | "training" | "category",
        id?: string
    ): Promise<T> => {
        const formData: FormData = new FormData();

        formData.append("type", typeMap[type]);
        id && formData.append("id", id);
        formData.append("file", file);

        setIsLoading(true);

        const response = await fetch("http://localhost:4000/file/upload", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: formData,
        });

        setIsLoading(false);
        // console.info(await response.json());
        return await response.json() as T;
    };

    return [isLoading, sendFile];
}