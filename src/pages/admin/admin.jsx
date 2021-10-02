import React from 'react';
import ContentSidebar from 'components/contentsidebar';


const AdminSidebar = () => {

    const MainSidebar = {
        display: 'flex',
        width: '100%',
        hight: '100vh',
        backgroundColor: "#00fff2",
     };

    return (
      
      <>
        <div style={MainSidebar}>
                <ContentSidebar />
        </div></>
    );
};

export default AdminSidebar;
