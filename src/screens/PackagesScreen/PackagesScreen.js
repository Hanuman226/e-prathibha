import { Card, Container } from "react-bootstrap";
import PackageCard from "./PackageCard";
import practice_exam_package_img from "../../Icons/practice_exam_package.png";
import premium_exam_package_img from "../../Icons/premium_package.png";
import free_exam_package_img from "../../Icons/free_package.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPackageDetails } from "../../api/packagesSlice";
import data from "../../data";
import PremiumCard from "./PremiumCard";
import PreLoader from "../../Components/PreLoader";
export default function PackagesScreen() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const packageData = useSelector((state) => state.packages.packageDetails);

  useEffect(() => {
    dispatch(getPackageDetails())
      .unwrap()
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  const { amount, show_amount, amount_year, show_amount_year, expiry_days } =
    packageData;

  const packageDetails = data.packageDetails;
  return (
    <>
      <Container className="shadow  shadow-md px-0">
        <Card>
          <Card.Header as="h5" className="text-center">
            Packages
          </Card.Header>
          <Card.Body className="d-flex gap-5 justify-content-center flex-wrap">
            <PackageCard
              {...packageDetails.free_package}
              photo={free_exam_package_img}
            />
            <PremiumCard
              {...packageDetails.premium_package}
              expiry={expiry_days}
              photo={premium_exam_package_img}
              {...{ amount, show_amount, amount_year, show_amount_year }}
            />
            <PackageCard
              {...packageDetails.practice_package}
              photo={practice_exam_package_img}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
