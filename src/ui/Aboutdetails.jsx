import AboutImage1 from "../../public/images/about-image-1.webp";
import AboutImage2 from "../../public/images/about-image-2.webp";
export default function Aboutdetails() {
  return (
    <div className="flex flex-col items-center justify-center gap-[4.8rem] rounded-lg bg-[#FFEEE6] px-[4.8rem] py-[4.8rem]">
      <h1 className="text-center text-[3.6rem] font-medium text-[#ff5500]">
        Welcome to The Chapter Den Book Store
      </h1>
      <div className="grid grid-cols-2 items-center justify-center gap-x-[4.8rem] gap-y-[9.6rem]">
        <div className="w-full">
          <img
            src={AboutImage2}
            className="full z-0 w-[70%] translate-x-[20%] rounded-2xl"
            alt="den-store-image"
          />
        </div>

        <div className="flex flex-col gap-[2rem] font-semibold">
          <h4 className="text-3xl font-medium text-gray-900">
            Our Story – A World of Books
          </h4>
          <p className="text-justify text-xl font-[350] leading-[2.6rem] text-gray-800">
            The Chapter Den is a modern bookstore dedicated to bringing readers
            a carefully curated collection of books from around the world. Our
            mission is to create a space where everyone — whether a casual
            reader, student, or lifelong book lover — can discover books that
            inspire, educate, and entertain.
            <br />
            <br />
            We offer a wide range of titles, including fiction, non-fiction,
            classics, bestsellers, and hidden literary gems. Every book is
            selected to ensure quality, relevance, and the potential to make a
            meaningful impact on our readers. Our focus is on creating a
            seamless experience where discovering, exploring, and enjoying books
            is easy and enjoyable.
          </p>
        </div>

        <div className="flex flex-col gap-[2rem] font-semibold">
          <h4 className="text-3xl font-medium text-gray-900">
            Why We Exist – The Power of Reading
          </h4>
          <p className="text-justify text-xl font-[350] leading-[2.6rem] text-gray-800">
            At The Chapter Den, we believe in the timeless value of reading and
            the unique connection that physical books provide. While digital
            media offers convenience, real books encourage focus, reflection,
            and creativity. Reading allows people to experience new
            perspectives, develop empathy, and expand their understanding of the
            world. Our store is designed to support this experience — a place
            where readers can browse comfortably, ask questions, and connect
            with knowledgeable staff.
            <br />
            <br />
            At The Chapter Den, we want every visit to be more than a
            transaction — we aim to create memorable experiences that stay with
            readers long after they leave. Our commitment to quality and
            curation ensures that every book on our shelves has value and
            purpose. By bringing readers together with stories that matter, The
            Chapter Den stands as a trusted destination where knowledge,
            imagination, and inspiration converge
          </p>
        </div>

        <img
          src={AboutImage1}
          className="full z-0 w-[70%] translate-x-[25%] rounded-2xl"
          alt="den-store-image"
        />
      </div>
    </div>
  );
}
