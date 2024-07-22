const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CustomerLoanDetails = new Schema(
  {
    student_id: {
      type: String,
    },
    filesendbank: [
      {
        bank_name: String,
      },
    ],
    bank_login_details: [
      {
        login_bank: String,
        login_id: String,
        loginDate: String,
        login_portal: String,
        login_password: String,
        vidyalaxmi_id: String,
        vidyalaxmi_password: String,
      },
    ],
    visit_pd: {
      type: String,
    },
    visit_pd_comment: {
      type: String,
    },
    decision: {
      type: String,
    },
    decline_reason: {
      type: String,
    },
    decline_bank_name: {
      type: String,
    },
    decline_reason_title: {
      type: String,
    },
    decline_reason_date: {
      type: String,
    },
    remark: {
      type: String,
    },
    decision_decline_date: {
      type: String,
    },
    decision_decline_remark: {
      type: String,
    },
    file_close_date: {
      type: String,
    },
    file_close_remark: {
      type: String,
    },
    solve_problem: {
      type: String,
    },
    bank_decision: [
      {
        decision_bank: String,
        loan_amount: String,
        loan_rate: String,
        insurance: String,
        proccessing_fees: String,
        remark: String,
        loan_date: String,
        roi: String,
      },
    ],
    final_sanction_bank_name: {
      type: String,
    },
    request_to_bank: {
      type: String,
    },
    disbursement_date: {
      type: String,
    },
    disbursement_remark: {
      type: String,
    },
    disbursement_amount: {
      type: String,
    },
    agreement_date: {
      type: String,
    },
    agreement_remark: {
      type: String,
    },
    cover_letter_given: {
      type: String,
    },
    sanction_letter_given: {
      type: String,
    },
    loan_ac_number: {
      type: String,
    },
    sanction_letter: {
      type: String,
    },
    sanction_amount: {
      type: String,
    },
    application_form_comment: {
      type: String,
    },
    applicant_property_address: {
      type: String,
    },
    applicant_property_owner: {
      type: String,
    },
    applicant_property_relation: {
      type: String,
    },
    valuer_name: {
      type: String,
    },
    valuation_remark: {
      type: String,
    },
    valuation_date: {
      type: String,
    },
    valuer_report_date: {
      type: String,
    },
    valuer_market_value: {
      type: String,
    },
    reliasable_value: {
      type: String,
    },
    valuer_report_remark: {
      type: String,
    },
    valuation_report: {
      type: String,
    },
    itr_verification_comment: {
      type: String,
    },
    itr_verification_date: {
      type: String,
    },
    mortgage_document: {
      type: String,
    },
    tcr_report: {
      type: String,
    },
    advocate_name: {
      type: String,
    },
    tcr_report_date: {
      type: String,
    },
    tcr_property_details: {
      type: String,
    },
    sro_copy_required: {
      type: String,
    },
    sro_copy_received: {
      type: String,
    },
    tcr_remark: {
      type: String,
    },
    psir_sheet: {
      type: String,
    },
    process_name: {
      type: String,
    },
    sanction_Date: {
      type: String,
    },
    branch_name: {
      type: String,
    },
    sanction_remark: {
      type: String,
    },
    mortgage_option: {
      type: String,
    },
    mortgage_date: {
      type: String,
    },
    mortgage_remark: {
      type: String,
    },
    appointment_date: {
      type: String,
    },
    sro_office: {
      type: String,
    },
    appointment_remark: {
      type: String,
    },
    registration_date: {
      type: String,
    },
    registration_number: {
      type: String,
    },
    registration_remark: {
      type: String,
    },
    submittion_date: {
      type: String,
    },
    submittion_remark: {
      type: String,
    },
    pf_amount: {
      type: String,
    },
    pf_date: {
      type: String,
    },
    pf_remark: {
      type: String,
    },
    pf_document: {
      type: String,
    },
    signature_date: {
      type: String,
    },
    signature_remark: {
      type: String,
    },
    application_form_date: {
      type: String,
    },
    application_form_remark: {
      type: String,
    },
    document_upload_date: {
      type: String,
    },
    document_upload_remark: {
      type: String,
    },
    login_id_date: {
      type: String,
    },
    login_id: {
      type: String,
    },
    under_review_date: {
      type: String,
    },
    under_review_remark: {
      type: String,
    },
    query_date: {
      type: String,
    },
    query_remark: {
      type: String,
    },
    query_sent_date: {
      type: String,
    },
    query_sent_remark: {
      type: String,
    },
    mortgage_type: {
      type: String,
    },
    mortgage_given_date: {
      type: String,
    },
    mortgage_given_remark: {
      type: String,
    },
    mortgage_received_date: {
      type: String,
    },
    mortgage_received_remark: {
      type: String,
    },

    file_online_submit_date: {
      type: String,
    },
    file_online_submit_remark: {
      type: String,
    },
    file_submit_office_date: {
      type: String,
    },
    file_submit_office_remark: {
      type: String,
    },
    under_followup_date: {
      type: String,
    },
    under_followup_remark: {
      type: String,
    },

    itr_varification_report_got: {
      type: String,
    },
    itr_received_date: {
      type: String,
    },
    itr_given_date: {
      type: String,
    },
    upload_sheet: {
      type: String,
    },
    createdby: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    upadatedAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "customerloan",
  }
);

module.exports = mongoose.model("CustomerLoanDetails", CustomerLoanDetails);
