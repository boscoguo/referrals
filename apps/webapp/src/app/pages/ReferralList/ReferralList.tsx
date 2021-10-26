import React, { useEffect, useState } from 'react';
import { ReferralTable } from '../../components/ReferralTable';
import { Referral } from '../../types/referral';
import httpMethod from '../../utils/httpUtils';
import style from './ReferralList.module.css';

const ReferralList: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const result:any = await httpMethod.get();
      setReferrals(result)
    }
    fetchData()
  }, []);
  return (
    <div className={style.frame}>
      <ReferralTable referrals={referrals} setReferrals={setReferrals}/>
    </div>
  );
};

export { ReferralList };
