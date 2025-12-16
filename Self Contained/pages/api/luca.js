// pages/api/luca.js (FINAL PATH CORRECTION)
import { LUCACore } from '../../lib/lucacore'; // Correct path from /pages/api/ to /lib/

// Mock State Manager for demonstration
const stateManager = {
    state: {},
    load: async () => stateManager.state,
    save: async (newState) => { stateManager.state = newState; }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { input, stimulus } = req.body;
        const lastState = await stateManager.load();
        const luca = new LUCACore(lastState);

        const { response, state, report, liveData } = await luca.tick(input, stimulus);

        await stateManager.save(state);

        res.status(200).json({
            status: "ok",
            ...report,
            liveData: liveData,
            integrity: state.genomeParams.integrity,
            generation: state.genomeParams.generation,
            memories: state.meshData.length
        });

    } catch (error) {
        console.error('LUCA Core Error:', error);
        res.status(500).json({ message: 'Internal LUCA Error', details: error.message });
    }
}
