import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getCategories } from "../http-clients/http-clients";
import { Category } from "../interfaces/category.model";

const Home: React.FunctionComponent = (props) => {
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        getCategories()
            .then(res => {
                setCategories(res);
            })
            .catch(err => {
            });
        return () => {
        }
    }, [])
    return (
        <>
            <Navbar />
            <Sidebar categories={categories} />
            <main style={{ marginTop: '56px' }}>
                <div className="container">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare sit amet odio vitae mollis. Ut aliquam efficitur lorem, quis pretium dolor malesuada sed. Phasellus vel neque pulvinar urna suscipit euismod. In dignissim accumsan metus, a varius augue consectetur sed. In ornare vulputate quam, a aliquam libero. Duis finibus, sem at vehicula sodales, velit mauris iaculis metus, ut viverra velit nisi at justo. In hac habitasse platea dictumst. Nullam dignissim vestibulum nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec leo libero, posuere vitae est vitae, porttitor pellentesque mi. Quisque accumsan, quam sed aliquam lobortis, lacus quam vestibulum erat, ut consequat arcu nisi ac enim. Aenean ligula augue, malesuada sed tellus ac, vestibulum pretium purus. In mollis elit sit amet lacus egestas, eget condimentum justo tempor. Aenean non augue sed est auctor semper id nec lorem.

                    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam purus nulla, gravida sit amet elit dapibus, commodo lobortis neque. Ut cursus, purus vitae semper tincidunt, turpis risus aliquam ante, ornare hendrerit metus quam eu risus. Proin eget interdum enim. Donec sit amet tellus vitae ante tempus finibus at rhoncus arcu. Praesent fringilla nulla et nisi ultrices tincidunt. Phasellus ac lobortis metus. Nam est ante, euismod quis dui et, convallis dictum nunc. Sed vel congue erat. Etiam posuere urna massa, vel posuere est suscipit nec. Suspendisse felis arcu, luctus a pulvinar et, sodales auctor arcu. Mauris vehicula bibendum orci, nec aliquet libero consequat accumsan. In malesuada lacus at purus convallis, vitae maximus orci tempus.

                    Fusce ut tortor vel sem scelerisque tincidunt. Maecenas tempor diam vitae ipsum varius, ut aliquet urna feugiat. Aliquam ac diam at orci aliquam scelerisque. In hac habitasse platea dictumst. Donec vel molestie lectus, vitae ornare ex. Nullam porta elit eget elit facilisis aliquam. Etiam ac est at urna ultrices laoreet et eget odio. Duis pellentesque tellus at nibh ullamcorper, at hendrerit purus vehicula. Fusce dolor nibh, mollis a condimentum non, tempus non libero. Maecenas sodales ut justo faucibus volutpat. Fusce viverra justo nisl. Nunc facilisis pretium sapien id lobortis. Ut vel dolor sit amet velit convallis semper eu quis libero.

                    Donec viverra turpis ultricies lectus ultrices vulputate sed eget turpis. Sed condimentum, ligula sit amet venenatis tristique, leo risus sagittis sapien, a maximus ex elit at dolor. Nulla ut urna vulputate, convallis neque a, dignissim magna. Quisque varius finibus volutpat. Nunc ex tellus, aliquet eget risus sed, viverra porta nulla. Phasellus condimentum quam at venenatis viverra. Ut a lobortis sem, quis sollicitudin neque. Vestibulum tempus justo ac felis vehicula tempus.

                    Praesent fermentum justo urna, sed sodales dolor semper eu. Suspendisse et tincidunt lacus, a suscipit nisi. Praesent id erat sem. Curabitur interdum volutpat nisl varius dapibus. Sed fringilla congue vehicula. Aenean tempor ipsum libero, vel viverra dui semper vitae. Suspendisse potenti. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam malesuada urna nibh, non porta ante imperdiet id.
                </div>
            </main>
        </>
    )
}

export default Home;
