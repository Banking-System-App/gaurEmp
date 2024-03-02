export const CompanyUtil = {
  updatedData(obj) {
    var {
      company_id,
      company_address,
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
      company_id,
      company_address,
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
    };

    return newobj;
  },

  changelabel: {
    company_id: "Company Id",
    company_address: "Company Address",
    pf_code: "PF Code",
    pf_limit: "PF Limit",
    esi_code: "ESI Code",
    name: "Company Name",
    lwf_flag: "LWF Flag",
    pf_member: "PF Member Flag",
    ot_payable_flag: "OT Payable Flag",
    group: "Group",
    pan_numer: "Pan Number",
    es_member_flag: "ES Member Flag",
    location_office: "Office location",
    lwf_code: "LWF Code",
    ot_rate: "OT Rate",
    tan_no: "Tan Number",
  },
};
