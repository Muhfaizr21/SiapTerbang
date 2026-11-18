package asrama

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	asramaModel "siapterbang-backend/internal/models/tu/asrama"
	ppdbModel "siapterbang-backend/internal/models/tu/ppdb"
	"siapterbang-backend/internal/services/tu/store"
	"siapterbang-backend/internal/views"
)

type Controller struct {
	store *store.TuDataStore
}

func NewController(ds *store.TuDataStore) *Controller {
	return &Controller{store: ds}
}

func resolveTenantID(r *http.Request) string {
	if h := strings.TrimSpace(r.Header.Get("X-Tenant-ID")); h != "" {
		return h
	}
	return store.DefaultDemoTenantID
}

func (c *Controller) RecordViolation(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	studentID := strings.TrimSpace(r.PathValue("id"))

	var input asramaModel.RecordViolationRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload poin pelanggaran tidak valid", err.Error())
		return
	}
	if input.PointsAdded <= 0 {
		views.Error(w, http.StatusUnprocessableEntity, store.ErrInvalidPoints.Error(), nil)
		return
	}

	c.store.Mu.Lock()
	defer c.store.Mu.Unlock()

	for i := range c.store.Students {
		st := &c.store.Students[i]
		if st.TenantID == tenantID && st.ID == studentID {
			st.ViolationPoints += input.PointsAdded
			if st.ViolationPoints >= asramaModel.MaxAllowedViolationPoints {
				st.StudentStatus = ppdbModel.StatusSuspended
				st.LockedFromMensetsu = true
			}
			st.UpdatedAt = time.Now().UTC()

			v := asramaModel.DormitoryViolation{
				ID:             fmt.Sprintf("vio-%d", len(c.store.Violations)+1),
				TenantID:       tenantID,
				StudentID:      st.ID,
				StudentName:    st.FullName,
				ViolationTitle: strings.TrimSpace(input.ViolationTitle),
				Category:       input.Category,
				PointsAdded:    input.PointsAdded,
				RecordedBy:     strings.TrimSpace(input.RecordedBy),
				OccurredAt:     time.Now().UTC(),
			}
			c.store.Violations = append([]asramaModel.DormitoryViolation{v}, c.store.Violations...)
			views.Success(w, http.StatusCreated, "Poin pelanggaran disiplin berhasil dicatat", map[string]any{
				"student":   *st,
				"violation": v,
			})
			return
		}
	}

	views.Error(w, http.StatusNotFound, store.ErrStudentNotFound.Error(), nil)
}

func (c *Controller) AssignDormitory(w http.ResponseWriter, r *http.Request) {
	tenantID := resolveTenantID(r)
	studentID := strings.TrimSpace(r.PathValue("id"))

	var input asramaModel.AssignDormitoryRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		views.Error(w, http.StatusBadRequest, "Payload kamar asrama tidak valid", err.Error())
		return
	}

	c.store.Mu.Lock()
	defer c.store.Mu.Unlock()

	var targetRoom *asramaModel.DormitoryRoom
	for i := range c.store.Rooms {
		if c.store.Rooms[i].TenantID == tenantID && c.store.Rooms[i].ID == input.RoomID {
			targetRoom = &c.store.Rooms[i]
			break
		}
	}
	if targetRoom == nil {
		views.Error(w, http.StatusNotFound, store.ErrRoomNotFound.Error(), nil)
		return
	}
	if targetRoom.OccupiedCount >= targetRoom.Capacity {
		views.Error(w, http.StatusUnprocessableEntity, store.ErrRoomFull.Error(), nil)
		return
	}

	for i := range c.store.Students {
		st := &c.store.Students[i]
		if st.TenantID == tenantID && st.ID == studentID {
			st.DormitoryRoomID = targetRoom.ID
			st.DormitoryRoomCode = targetRoom.RoomCode
			st.UpdatedAt = time.Now().UTC()
			targetRoom.OccupiedCount++
			views.Success(w, http.StatusOK, "Penempatan kamar asrama berhasil diperbarui", *st)
			return
		}
	}

	views.Error(w, http.StatusNotFound, store.ErrStudentNotFound.Error(), nil)
}
