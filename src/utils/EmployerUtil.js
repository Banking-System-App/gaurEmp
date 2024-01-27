export const EmployerUtil = {


    updatedData(obj){

        var {
            employer_id,
            employer_address,
            pf_code,
            pf_limit,
            esi_code,
            name,
            lwf_flag,
            pf_member,
            ot_payable_flag,
            group,
            pan_numer,
            es_member_flag,
            location_office,
            lwf_code,
            ot_rate,
            tan_no,
            agent_id,
        } = obj;

        var newobj = {
            employer_id,
            employer_address,
            pf_code,
            pf_limit,
            esi_code,
            name,
            lwf_flag,
            pf_member,
            ot_payable_flag,
            group,
            pan_numer,
            es_member_flag,
            location_office,
            lwf_code,
            ot_rate,
            tan_no,
            agent_id,
        }

        return newobj;
    },

     changelabel : {
        employer_id: "Employer Id",
            employer_address: "Employer Address",
            pf_code: "pfCode",
            pf_limit: "PF Limit",
            esi_code: "esiCode",
            name: "Employer Name",
            lwf_flag: "lwfFlag",
            pf_member: "pfMemberFlag",
            ot_payable_flag: "otPayableFlag",
            group: "group",
            pan_numer: "Pan Number",
            es_member_flag: "esMemberFlag",
            location_office: "Office location",
            lwf_code: "lwfCode",
            ot_rate: "otRate",
            tan_no: "Tan Number",
            agent_id: "agentId",
    },
}