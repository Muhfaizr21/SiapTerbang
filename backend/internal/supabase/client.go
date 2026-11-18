package supabase

import (
	"fmt"
	"net/http"
	"time"

	"siapterbang-backend/internal/config"
)

type Client struct {
	BaseURL        string
	PublishableKey string
	SecretKey      string
	JWKSURL        string
	httpClient     *http.Client
}

func NewClient(cfg *config.Config) *Client {
	return &Client{
		BaseURL:        cfg.SupabaseURL,
		PublishableKey: cfg.SupabasePublishableKey,
		SecretKey:      cfg.SupabaseSecretKey,
		JWKSURL:        cfg.SupabaseJWKSURL,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// Ping checks connectivity to the Supabase URL
func (c *Client) Ping() error {
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/rest/v1/", c.BaseURL), nil)
	if err != nil {
		return err
	}
	req.Header.Set("apikey", c.PublishableKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.PublishableKey))

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 500 {
		return fmt.Errorf("supabase returned server error status: %d", resp.StatusCode)
	}

	return nil
}
