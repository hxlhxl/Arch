package routing

import (
	"net/http"
	"strings"

	"gopkg.in/macaron.v1"
)

type Router interface {
	Handle(method, pattern string, handlers []macaron.Handler) *macaron.Route
	Get(pattern string, handlers... macaron.Handler) *macaron.Route
}

// RouteRegister allows you to add routes and macaron.Handlers
// that the web server should serve.
type RouteRegister interface {
	Get(string, ...macaron.Handler)
	Post(string, ...macaron.Handler)
	Delete(string, ...macaron.Handler)
	Put(string, ...macaron.Handler)
	Patch(string, ...macaron.Handler)
	Any(string, ...macaron.Handler)
	Group(string, func(RouteRegister), ...macaron.Handler)
	Insert(string, func(RouteRegister), ...macaron.Handler)
	Register(Router)
}


type RegisterNamedMiddleware func (name string) macaron.Handler

type route struct {
	method		string
	pattern		string
	handlers	[]macaron.Handler
}

type routeRegister struct {
	prefix			string
	subfixHandlers	[]macaron.Handler
	namedMiddleware	[]RegisterNamedMiddleware
	routes			[]route
	groups			[]*routeRegister
}


func (rr *routeRegister) Register(router Router) {
	for _, r := range rr.routes {
		if r.method == http.MethodGet {
			router.Get(r.pattern, r.handlers...)
		} else {
			router.Handle(r.method, r.pattern, r.handlers)
		}
	}

	for _, g := range rr.groups {
		g.Register(router)
	}
}

// NewRouteRegister creates a new RouteRegister with all middlewares sent as params
func NewRouteRegister(namedMiddleware ...RegisterNamedMiddleware) RouteRegister {
	return &routeRegister{
		prefix:          "",
		routes:          []route{},
		subfixHandlers:  []macaron.Handler{},
		namedMiddleware: namedMiddleware,
	}
}


func (rr *routeRegister) Insert(pattern string, fn func(RouteRegister), handlers ...macaron.Handler) {

	//loop over all groups at current level
	for _, g := range rr.groups {

		// apply routes if the prefix matches the pattern
		if g.prefix == pattern {
			g.Group("", fn)
			break
		}

		// go down one level if the prefix can be find in the pattern
		if strings.HasPrefix(pattern, g.prefix) {
			g.Insert(pattern, fn)
		}
	}
}

func (rr *routeRegister) Group(pattern string, fn func(rr RouteRegister), handlers ...macaron.Handler) {
	group := &routeRegister{
		prefix:          rr.prefix + pattern,
		subfixHandlers:  append(rr.subfixHandlers, handlers...),
		routes:          []route{},
		namedMiddleware: rr.namedMiddleware,
	}

	fn(group)
	rr.groups = append(rr.groups, group)
}





func (rr *routeRegister) route(pattern, method string, handlers ...macaron.Handler) {
	h := make([]macaron.Handler, 0)
	for _, fn := range rr.namedMiddleware {
		h = append(h, fn(pattern))
	}

	h = append(h, rr.subfixHandlers...)
	h = append(h, handlers...)

	for _, r := range rr.routes {
		if r.pattern == rr.prefix+pattern && r.method == method {
			panic("cannot add duplicate route")
		}
	}

	rr.routes = append(rr.routes, route{
		method:   method,
		pattern:  rr.prefix + pattern,
		handlers: h,
	})
}

func (rr *routeRegister) Get(pattern string, handlers ...macaron.Handler) {
	rr.route(pattern, http.MethodGet, handlers...)
}

func (rr *routeRegister) Post(pattern string, handlers ...macaron.Handler) {
	rr.route(pattern, http.MethodPost, handlers...)
}

func (rr *routeRegister) Delete(pattern string, handlers ...macaron.Handler) {
	rr.route(pattern, http.MethodDelete, handlers...)
}

func (rr *routeRegister) Put(pattern string, handlers ...macaron.Handler) {
	rr.route(pattern, http.MethodPut, handlers...)
}

func (rr *routeRegister) Patch(pattern string, handlers ...macaron.Handler) {
	rr.route(pattern, http.MethodPatch, handlers...)
}

func (rr *routeRegister) Any(pattern string, handlers ...macaron.Handler) {
	rr.route(pattern, "*", handlers...)
}
