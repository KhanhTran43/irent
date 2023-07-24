import { SelectOption } from "../models/select-option.model";
import { WardValue } from "../enums/ward-value.enum";
import { WardLabel } from "./ward-label.constant";

export const WARD_OPTIONS: SelectOption[] = [
    {
        label: WardLabel.ALL,
        value: WardValue.ALL
    },
    {
        label: WardLabel.CAM_LE,
        value: WardValue.CAM_LE
    },
    {
        label: WardLabel.HAI_CHAU,
        value: WardValue.HAI_CHAU
    },
    {
        label: WardLabel.LIEN_CHIEU,
        value: WardValue.LIEN_CHIEU
    },
    {
        label: WardLabel.NGU_HANH_SON,
        value: WardValue.NGU_HANH_SON
    },
    {
        label: WardLabel.SON_TRA,
        value: WardValue.SON_TRA
    },
    {
        label: WardLabel.THANH_KHE,
        value: WardValue.THANH_KHE
    },
    {
        label: WardLabel.HOA_VANG,
        value: WardValue.HOA_VANG
    },
    {
        label: WardLabel.HOANG_SA,
        value: WardValue.HOANG_SA
    }
]
