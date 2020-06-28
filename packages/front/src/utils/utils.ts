import React from "react";
import { useOktaAuth } from "@okta/okta-react";

export const formatDate = (date: Date): string => {
    const dd: string =
        date.getDate() < 10
            ? "0" + date.getDate().toString()
            : date.getDate().toString();
    const mm: string =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1).toString()
            : (date.getMonth() + 1).toString();
    const yy: string =
        date.getFullYear() % 100 < 10
            ? "0" + (date.getFullYear() % 100).toString()
            : (date.getFullYear() % 100).toString();

    return `${dd}.${mm}.${yy}`;
};

export function useFileUpload<T>(): [
    boolean,
    (
        file: File,
        type: "user" | "training" | "category" | "material",
        id?: string
    ) => Promise<T>
] {
    const typeMap: { [key: string]: string } = {
        user: "0",
        training: "1",
        category: "2",
        material: "3",
    };
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { authState } = useOktaAuth();

    const sendFile = async (
        file: File,
        type: "user" | "training" | "category" | "material",
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
                Authorization: `Bearer ${authState.accessToken}`,
            },
            body: formData,
        });

        setIsLoading(false);

        return (await response.json()) as T;
    };

    return [isLoading, sendFile];
}

export const useOktaFetchedUser = async (sub: string): Promise<{}> => {
    const responseFromOkta = await fetch(
        `https://dev-417692.okta.com/api/v1/users/${sub}`,
        {
            method: 'GET',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `SSWS 00Qgcob9EiG1vLxyRoY2czkSeSYcpzTRAFg-TjjiVl` //api token
        }
      });
    
    return await responseFromOkta.json();
}
