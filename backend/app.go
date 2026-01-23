package backend

import "context"

type App struct {
	ctx context.Context
}

func (a *App) Init(ctx context.Context) {
	a.ctx = ctx
}
