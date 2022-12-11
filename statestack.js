export default class StateStack extends EventTarget {

    #stack = [ ];
    #simulated_states = {min: 0, max: 0, stack: { }};
    #num_states = 0;
    #interval;
    #state_generator;

    constructor(interval, state_generator) {
        this.#interval = interval;   
        this.#state_generator = state_generator;
    }

    #add(state) {
        state.id = this.#num_states;
        this.#simulated_states.stack[this.#num_states] = state;
        this.#num_states ++;
    }

    #rollback(state) {
        this.#stack.splice(state.id); 
        this.#simulated_states.min = state.id;
        this.#simulated_states.stack = { };
        this.#simulated_states.stack[state.id] = state;
        this.#num_states = state.id + 1;
        this.simulate(this.#simulated_states.max - this.#simulated_states.min, state.id);
        this.step( );
    }

    insert(state) {
        if(state.id > this.#simulated_states.max) return;
        else if(state.id < this.#simulated_states.min) 
            return this.#rollback(state);
        this.#simulated_states[state.id] = state;
        this.simulate(this.#simulated_states.max - state.id, state.id);
    }

    simulate(repetitions, start = null) {
        if(!start) start = this.#simulated_states.min;
        this.#simulated_states.max = start + repetitions;
        for(let i = 0; i < repetitions; i++) {
            this.#add(this.#state_generator(this.#interval));
        }
    }

    step( ) {
        const state = this.#stack.shift( );
        if(!state) return;
        this.#stack.push(state);
        this.#simulated_states.min++;
        this.simulate(1, this.#simulated_states.max + 1);
        return state;
    }

    //
    setUpdateInterval(time) {
        this.#interval = time;
    }

    getStack( ) {
        return this.#stack;
    }

}