import "./RecipePage.css";
import Header from "../../Components/Header";
import star from "../../assets/star.png";
import profile from "../../assets/profile.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import youtube from "../../assets/youtube.png";
import pintrest from "../../assets/pintrest.png";
import Footer from "../../Components/Footer";

function RecipePage() {
  const ingredients = [
    "Egg whites - You’ll need a dozen. Quick trick: buy liquid egg whites at the store. You will need 3 tablespoons in place of 1 egg white. You can find regular egg beaters at most stores or organic brands at Sprouts or Whole Foods.",
    "Red pepper -Fresh (for a healthier option) or roasted (for more flavor) work. Either way, chop peppers into small pieces. If using roasted, be sure to drain extra liquid and dab to dry.",
    "Spinach - Finely chopped so it evenly disperses.",
    "Shredded cheese - Monterrey jack is what Starbucks uses, but you can switch for Mozzarella, cheddar, or even gruyere depending on your preference and what you have on hand!",
    "Cottage cheese - Aim for at least 2%, 4% is even better. If there is less fat than this, the cheese will make the bites extremely watery.",
    "Hot sauce - Just a touch. Tobasco or Sriracha can also be used. Or, omit to avoid the heat.",
    "Seasoning - Garlic powder, salt, and black pepper are all you need here.",
  ];
  const instructions = [
    "Either crack and separate eggs placing only the whites in the bowl or opt for liquid egg whites from a carton. Pour into a bowl with a spout or at least a 6-cup measuring cup. It will be MUCH easier to get the mixture into the muffin tins this way!",
    "Prepare the vegetables and cheese by chopping the spinach, green onions, and red peppers.",
    "Add the vegetables, shredded cheese, and cottage cheese directly to the mixing bowl. Again, aim for at least 2%, if not even 4% fat cottage cheese.",
    "Many people notice that dishes like egg bites stick to the tins. If you are using an older pan that is scratched, this will very likely happen. Use a newer pan and liberally cover the insides with non-stick cooking spray.",
    "Fill muffin cups ¾ full with the egg mixture. When they’re all poured, stir the filling to ensure everything is well mixed.",
    "When they are fully cooked, leave them to cool slightly on the counter. Sprinkle with fresh parsley and enjoy!",
  ];
  const comments = [
    {
      id: 1,
      author: "Mr John",
      date: "08/29/2012",
      text: "Geez some people drive me crazy! How on earth are you going to rate this recipe when you haven't even made it??? & because of the calorie/fat content? Not at any point does this recipe say low calorie or low fat! To rate a recipe with 1 star because of what it \"sounds\" like completely defeats the meaning of this website. I've never commented before, but I am just amazed at some users sometimes!!! By the way...wonderful recipe!!! Will make again & again...& again!",
    },
    {
      id: 2,
      author: "Jane Doe",
      date: "09/05/2012",
      text: " The combination of ingredients created some degree of palate confusion. I decreased the amount of pesto to 9oz and it was still too much. The finished product was a nondistinct presentation, looking more like mush with no appeal. I will not make this again. IF I needed to alter the recipe, I would make penne with pesto, add some chicken, add some sun dried tomatoes, and decrease the 4 cups of shredded cheese. One star was way to generous.",
    },
  ];

  return (
    <>
      <div className="banner">
        <h1>Greek Faro Salad</h1>
      </div>
      <div className="ingredients">
        <h2>Ingredients</h2>
        <ul style={{ listStyleType: "disc" }}>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2>Steps</h2>
        <ol>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        <h5 className="rating">
          <b>Rating</b>
        </h5>
        <ol className="rates">
          <li>
            <img src={star} alt="Star" />
          </li>
          <li>
            <img src={star} alt="Star" />
          </li>
          <li>
            <img src={star} alt="Star" />
          </li>
          <li>
            <img src={star} alt="Star" />
          </li>
          <li>
            <img src={star} alt="Star" />
          </li>
        </ol>
        <h5 className="rating">
          <b>Comments</b>
        </h5>
        <ul style={{ listStyleType: "none" }}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div style={{ display: "flex" }}>
                <img src={profile} className="profile" alt="Profile" />
                <div>
                  <h5>{comment.author}</h5>
                  <p>{comment.date}</p>
                </div>
              </div>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
        <h5 className="rating">
          <b>Share Recipe</b>
        </h5>
        <div className="share">
          <a href="https://www.facebook.com/">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="https://twitter.com/">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="https://www.pinterest.com/">
            <img src={pintrest} alt="Pintrest" />
          </a>
          <a href="https://www.youtube.com/">
            <img src={youtube} alt="Youtube" />
          </a>
        </div>
      </div>
    </>
  );
}

export default RecipePage;
