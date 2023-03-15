import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookingFormData, createBooking } from "../api/bookingApi";
import { getServicePackageById } from "../api/servicePackage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const BookingForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [servicePackage, setServicePackage] = useState<any>();

  const [bookingData, setBookingData] = useState<BookingFormData>({
    customerId: user.userId,
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: user.email,
    customerGender: "",
    customerAge: 0,
    bookingTime: "",
    bookingAddress: "",
    serviceId: "",
    notes: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getServicePackageById(id);
      if (response.data.data) {
        setServicePackage(response.data.data);
        setBookingData({
          ...bookingData,
          serviceId: response.data.data._id,
        });
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(bookingData);

    const response = await createBooking(bookingData);
    if (response.data.data) {
      console.log(response.data);

      navigate("/payment", {
        state: {
          data: {
            servicePackage: servicePackage._id,
            price: servicePackage.price,
            bookingId: response.data.data,
          },
        },
      });
    } else {
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            value={bookingData.customerName}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerName: event.target.value,
              })
            }
          />
        </label>
        <label>
          Customer Address:
          <input
            type="text"
            value={bookingData.customerAddress}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerAddress: event.target.value,
              })
            }
          />
        </label>
        <label>
          Customer Phone:
          <input
            type="text"
            value={bookingData.customerPhone}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerPhone: event.target.value,
              })
            }
          />
        </label>
        <label>
          Customer Email:
          <input
            type="email"
            value={bookingData.customerEmail}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerEmail: event.target.value,
              })
            }
          />
        </label>
        <label>
          Customer Gender:
          <input
            type="text"
            value={bookingData.customerGender}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerGender: event.target.value,
              })
            }
          />
        </label>
        <label>
          Customer Age:
          <input
            type="number"
            value={bookingData.customerAge}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                customerAge: Number(event.target.value),
              })
            }
          />
        </label>
        <label>
          Booking Time:
          <input
            type="datetime-local"
            value={bookingData.bookingTime}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                bookingTime: event.target.value,
              })
            }
          />
        </label>
        <label>
          Booking Address:
          <input
            type="text"
            value={bookingData.bookingAddress}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                bookingAddress: event.target.value,
              })
            }
          />
        </label>

        <label>
          Notes:
          <textarea
            value={bookingData.notes}
            onChange={(event) =>
              setBookingData({
                ...bookingData,
                notes: event.target.value,
              })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {servicePackage && (
        <div>
          <div className=""></div>
          <p>{servicePackage.title}</p>
          <p>{servicePackage.price}</p>
          <p>{servicePackage.description}</p>
          {servicePackage &&
            servicePackage.image.map((imageUrl: string, index: number) => (
              <img key={index} src={imageUrl} alt={`Post image ${index}`} />
            ))}
          <p>Star: {servicePackage.star.length}</p>
          <p>User: {servicePackage.user.username}</p>
          <p>Posted at: {new Date(servicePackage.createAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
