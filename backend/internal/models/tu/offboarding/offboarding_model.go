package offboarding

import "time"

type OffboardingRequest struct {
	ID                   string    `json:"id"`
	TenantID             string    `json:"tenant_id"`
	StudentID            string    `json:"student_id"`
	StudentName          string    `json:"student_name"`
	StudentNIS           string    `json:"student_nis"`
	Reason               string    `json:"reason"`
	TotalPaidIDR         int64     `json:"total_paid_idr"`
	DeductionMCUIDR      int64     `json:"deduction_mcu_idr"`
	DeductionPassportIDR int64     `json:"deduction_passport_idr"`
	DeductionUniformIDR  int64     `json:"deduction_uniform_idr"`
	DeductionDormIDR     int64     `json:"deduction_dorm_idr"`
	NetRefundIDR         int64     `json:"net_refund_idr"`
	ApprovalStatus       string    `json:"approval_status"`
	CreatedAt            time.Time `json:"created_at"`
}

type CreateOffboardingInput struct {
	StudentID            string `json:"student_id"`
	Reason               string `json:"reason"`
	TotalPaidIDR         int64  `json:"total_paid_idr"`
	DeductionMCUIDR      int64  `json:"deduction_mcu_idr"`
	DeductionPassportIDR int64  `json:"deduction_passport_idr"`
	DeductionUniformIDR  int64  `json:"deduction_uniform_idr"`
	DeductionDormIDR     int64  `json:"deduction_dorm_idr"`
}
