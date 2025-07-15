import {apiService} from "../../../services/api-service";
import {API_CLASS, API_CLASS_LIST} from "../../../constant/api-path";

import type {ClassResponse} from "../type/class-response";
import type {ClassListRequest} from "../type/class-list-request";
import type {ApiResponse} from "../../../libs/types/api-response";
import type {PaginationResponse} from "../../../libs/types/pagination-response";

export const createClass = async (name: string, description: string, publicFlag: boolean) : Promise<ClassResponse> => {
    const response = await apiService.post<ApiResponse<ClassResponse>>(API_CLASS, {
        name,
        description,
        publicFlag
    });

    return response.data;
};

export const getClasses = async (params: ClassListRequest) : Promise<PaginationResponse<ClassResponse>> => {
    const response = await apiService.get<ApiResponse<PaginationResponse<ClassResponse>>>(API_CLASS_LIST, {
        page: params.page,
        size: params.size,
        orderBy: params.orderBy,
        search: params.search,
        workspace: params.workspace,
    });

    return response.data;
};