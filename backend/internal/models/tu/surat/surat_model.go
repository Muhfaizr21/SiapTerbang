package surat

import "time"

type OfficialLetter struct {
	ID                string    `json:"id"`
	TenantID          string    `json:"tenant_id"`
	StudentID         string    `json:"student_id"`
	StudentName       string    `json:"student_name"`
	StudentNIS        string    `json:"student_nis"`
	LetterNumber      string    `json:"letter_number"`
	LetterType        string    `json:"letter_type"`
	DestinationAgency string    `json:"destination_agency"`
	SignerName        string    `json:"signer_name"`
	SignerRole        string    `json:"signer_role"`
	IssuedDate        string    `json:"issued_date"`
	CreatedAt         time.Time `json:"created_at"`
}

type GenerateLetterRequest struct {
	StudentID         string `json:"student_id"`
	LetterType        string `json:"letter_type"`
	DestinationAgency string `json:"destination_agency"`
	SignerName        string `json:"signer_name"`
	SignerRole        string `json:"signer_role"`
}
