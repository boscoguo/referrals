import * as cors from 'cors';
import * as express from 'express';
import { getAllReferrals, getReferralById, creatReferral, updateReferralById, deleteReferralById } from './referrals/api';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/referrals', getAllReferrals);
app.get('/referrals/:id', getReferralById);
app.post('/referrals', creatReferral);
app.put('/referrals/:id', updateReferralById);
app.delete('/referrals/:id', deleteReferralById);

export default app;
