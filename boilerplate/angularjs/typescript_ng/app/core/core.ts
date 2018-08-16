
import 'app/core/controllers/all';
import coreModule from './core_module';
import appEvents from './app_events';

// components
import componentEntry from './components';
// directives
import directiveEntry from './directives';

function noop() {}

export {
    coreModule,
    appEvents,
    noop,
    // components
    componentEntry,
    // directives
    directiveEntry
};
